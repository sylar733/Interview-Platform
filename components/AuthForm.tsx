'use client';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Form } from '@/components/ui/form';
import Image from 'next/image';
import Link from 'next/link';
import { toast } from 'sonner';
import FormField from './FormField';
import { useRouter } from 'next/navigation';

type FormType = 'sign-in' | 'sign-up';

// Schema setup based on form type
const authFormSchema = (type: FormType) => {
  return z.object({
    name: type === 'sign-up' ? z.string().min(3) : z.string().optional(),
    email: z.string().email(),
    password: z.string().min(3),
  });
};

// Component setup
const AuthForm = ({ type }: { type: FormType }) => {
  const router = useRouter();
  const formSchema = authFormSchema(type);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      email: '',
      password: '',
    },
  });

  // Submit handler
  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      if (type === 'sign-up') {
        toast.success('Account created successfully. Please sign in');
        router.push('/sign-in');
      } else {
        toast.success('Sign in successfully.');
        router.push('/');
      }
    } catch (error) {
      console.log(error);
      toast.error(`There was an Error: ${error}`);
    }
  };

  const isSignIn = type === 'sign-in';

  return (
    <div className="card-border lg:min-w-[566px]">
      <div className="flex flex-col gap-6 card py-14 px-10">
        {/* Logo and title */}
        <div className="flex flex-row gap-2 justify-center">
          <Image src="/logo.svg" alt="logo" height={32} width={38} />
          <h2 className="text-primary-100">PrepWise</h2>
        </div>
        <h3 className="text-center">Practice job interview with AI</h3>

        {/* Form */}
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-6 mt-4 form">
            {!isSignIn && (
              <FormField control={form.control} name="name" label="Name" placeholder="Your name" />
            )}
            <FormField
              control={form.control}
              name="email"
              label="Email"
              placeholder="your.email@example.com"
            />
            <FormField
              control={form.control}
              name="password"
              label="Password"
              type="password"
              placeholder="Your password"
            />
            <Button className="btn" type="submit">
              {isSignIn ? 'Sign in' : 'Create an Account'}
            </Button>
          </form>
        </Form>

        {/* Toggle between sign-in and sign-up */}
        <p className="text-center">
          {isSignIn ? 'No account yet?' : 'Have an account already?'}{' '}
          <Link
            href={isSignIn ? '/sign-up' : '/sign-in'}
            className="font-bold text-user-primary ml-1"
          >
            {isSignIn ? 'Sign up' : 'Sign in'}
          </Link>
        </p>
      </div>
    </div>
  );
};

export default AuthForm;
