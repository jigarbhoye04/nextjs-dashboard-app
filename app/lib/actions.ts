'use server';
import { custom, date, z } from 'zod'; // Zod, a TypeScript-first validation library
import { sql } from '@vercel/postgres'; // Postgres client for Vercel to insert form data into the database
import { revalidatePath } from 'next/cache'; //Clear Cache to trigger a new request to the server
import { redirect } from 'next/navigation'; //Redirect to invoices page
import { error } from 'console';

const FormSchema = z.object({
  id: z.string(),
  customerId: z.string({
    invalid_type_error: 'Please Select a customer.',
  }),
  amount: z.coerce
    .number()
    .gt(0, { message: 'Please enter an amount greater than $0.' }),
  status: z.enum(['pending', 'paid'], {
    invalid_type_error: 'Please select an innvoice status.',
  }),
  date: z.string(),
});

const CreateInvoice = FormSchema.omit({ id: true, date: true });

export type State = {
  error?: {
    custometId?: string[];
    amount?: string[];
    status?: string[];
  };
  message?: string | null;
};

export async function createInvoice(prevState: State, formdata: FormData) {
  const rawFormData = {
    customerId: formdata.get('customerId'),
    amount: formdata.get('amount'),
    status: formdata.get('status'),
  };

  // const { customerId, amount, status } = CreateInvoice.parse(rawFormData);
  // const amountInCents = amount * 100;
  // const date = new Date().toISOString().split('T')[0];

  /*  
  .toISOString(): Converts the Date object into a string using the ISO 8601 format, which looks like YYYY-MM-DDTHH:mm:ss.sssZ. The T separates the date and time components, and the Z indicates that the time is in UTC.
  .split('T')[0]: Splits the ISO string into an array using T as the delimiter, resulting in two elements: the date (YYYY-MM-DD) and the time (HH:mm:ss.sssZ). The [0] accesses the first element of this array, which is the date part.
  */

  //Validate form using Zod
  const validateFields = CreateInvoice.safeParse({ rawFormData });
  // safeParse() will return an object containing either a success or error field.
  // This will help handle validation more gracefully without having put this logic inside the try/catch block.

  // If form validation fails, return errors early. Otherwise, continue
  if (!validateFields.success) {
    return {
      errors: validateFields.error.flatten().fieldErrors,
      message: 'Missing Fields. Failed to Create Invoice.',
    };
  }
  //Test
  // console.log(rawFormData);
  // console.log('Type of const: ', typeof rawFormData.amount);

  // Prepare data for insertion into the database
  const { customerId, amount, status } = validateFields.data;
  const amountInCents = amount * 100;
  const date = new Date().toISOString().split('T')[0];

  try {
    await sql`
      INSERT INTO invoices (customer_id, amount, status, date)
      VALUES (${customerId}, ${amountInCents}, ${status}, ${date})
    `;
  } catch (error) {
    return {
      message: 'Database Error: Failed to Create Invoice.',
    };
  }

  revalidatePath('/dashboard/invoices');
  redirect('/dashboard/invoices');
}

const UpdateInvoice = FormSchema.omit({ id: true, date: true });

export async function updateInvoice(
  id: string,
  formData: FormData,
  prevState: State,
) {
  // const { customerId, amount, status } = UpdateInvoice.parse({
  //   customerId: formData.get('customerId'),
  //   amount: formData.get('amount'),
  //   status: formData.get('status'),
  // });
  // const amountInCents = amount * 100;
  
  const validatedFields = UpdateInvoice.safeParse({
    customerId: formData.get('customerId'),
    amount: formData.get('amount'),
    status: formData.get('status'),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Missing Fields. Failed to Update Invoice.',
    };
  }

  const { customerId, amount, status } = validatedFields.data;
  const amountInCents = amount * 100;

  try {
    await sql`
        UPDATE invoices
        SET customer_id = ${customerId}, amount = ${amountInCents}, status = ${status}
        WHERE id = ${id}
      `;
  } catch (error) {
    return { message: 'Database Error: Failed to Update Invoice.' };
  }

  revalidatePath('/dashboard/invoices');
  redirect('/dashboard/invoices');
}

export async function deleteInvoice(id: string) {
  // throw new Error('Failed to Delete Invoice');ss

  // Unreachable code block
  try {
    await sql`DELETE FROM invoices WHERE id = ${id}`;
    revalidatePath('/dashboard/invoices');
    return { message: 'Deleted Invoice' };
  } catch (error) {
    return { message: 'Database Error: Failed to Delete Invoice' };
  }
}
