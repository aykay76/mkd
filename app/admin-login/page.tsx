import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

export default function AdminLoginPage() {
  async function handleLogin(formData: FormData) {
    'use server';
    const password = formData.get('password');
    if (password === process.env.ADMIN_PASSWORD) {
      cookies().set('admin_auth', password as string, { path: '/admin', httpOnly: true });
      redirect('/admin');
    }
    // Optionally, you can add error handling here
  }

  return (
    <form action={handleLogin} method="POST" className="flex flex-col gap-4 max-w-xs mx-auto mt-20">
      <label htmlFor="password">Admin Password</label>
      <input type="password" name="password" id="password" className="border p-2" required />
      <button type="submit" className="bg-blue-600 text-white p-2 rounded">Login</button>
    </form>
  );
}
