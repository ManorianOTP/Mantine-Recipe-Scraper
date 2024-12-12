'use client';

import HeaderBar from '@/components/header-bar/header-bar';
import { LoginForm } from '@/components/login-form/login-form';

export default function LoginPage() {
  return (
    <>
      <HeaderBar />
      <div
        style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: 'calc(100vh - 60px)' }}>
        <LoginForm />
      </div>
    </>
  );
}
