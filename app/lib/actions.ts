'use server';
import { custom, date, z } from 'zod'; // Zod, a TypeScript-first validation library
import { sql } from '@vercel/postgres'; // Postgres client for Vercel to insert form data into the database
import { revalidatePath } from 'next/cache'; //Clear Cache to trigger a new request to the server
import { redirect } from 'next/navigation'; //Redirect to invoices page
import { constants } from 'buffer';

const FormSchema = z.object({
  id: z.string(),
  customerId: z.string(),
  amount: z.coerce.number(),
  status: z.enum(['pending', 'paid']),
  date: z.string(),
});

const CreateInvoice = FormSchema.omit({ id: true, date: true });

export async function createInvoice(formdata: FormData) {
  const rawFormData = {
    customerId: formdata.get('customerId'),
    amount: formdata.get('amount'),
    status: formdata.get('status'),
  };

  const { customerId, amount, status } = CreateInvoice.parse(rawFormData);
  const amountInCents = amount * 100;
  const date = new Date().toISOString().split('T')[0];

  /*  
  .toISOString(): Converts the Date object into a string using the ISO 8601 format, which looks like YYYY-MM-DDTHH:mm:ss.sssZ. The T separates the date and time components, and the Z indicates that the time is in UTC.
  .split('T')[0]: Splits the ISO string into an array using T as the delimiter, resulting in two elements: the date (YYYY-MM-DD) and the time (HH:mm:ss.sssZ). The [0] accesses the first element of this array, which is the date part.
  */

  //Test
  console.log(rawFormData);
  console.log('Type of const: ', typeof rawFormData.amount);

  //Write into database
  await sql`
    INSERT INTO invoices (customer_id, amount, status, date)
    VALUES (${customerId}, ${amountInCents}, ${status}, ${date})
    `;

  revalidatePath('/dashboard/invoices');
  redirect('/dashboard/invoices');
}

const UpdateInvoice = FormSchema.omit({ id: true, date: true });

export async function updateInvoice(id: string, formData: FormData) {
  const { customerId, amount, status } = UpdateInvoice.parse({
    customerId: formData.get('customerId'),
    amount: formData.get('amount'),
    status: formData.get('status'),
  });

  const amountInCents = amount * 100;

  await sql`
        UPDATE invoices
        SET customer_id = ${customerId},
            amount = ${amountInCents},
            status = ${status}
        WHERE id = ${id}
    `;

    revalidatePath('/dashboard/invoices');
    redirect('/dashboard/invoices');
}


export async function deleteInvoice(id:string) {
    await sql`DELETE FROM invoices WHERE id = ${id}`;
    revalidatePath('/dashboard/invoices');
}