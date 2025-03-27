import {useNavigate, useRouter} from '@tanstack/react-router';
import {useMutation} from '@tanstack/react-query';
import {useForm} from 'react-hook-form';
import {zodResolver} from '@hookform/resolvers/zod';
import {z} from 'zod';
import {Button} from "@/components/ui/button";
import {Input} from "@/components/ui/input";
import {Label} from "@/components/ui/label";
import {authService} from '@/services/auth.services';
import {useAuth} from "@/lib/auth.tsx";
import {toast} from 'sonner';
import {Eye, EyeOff} from "lucide-react";
import {useState} from 'react';
import {Card, CardContent, CardDescription, CardTitle} from '@/components/ui/card';
import {CardHeader} from "@/components/ui/card.tsx";


const loginSchema = z.object({
    email: z.string().min(1, 'email is required'),
    password: z.string().min(6, 'Password must be at least 6 characters'),
});

type LoginForm = z.infer<typeof loginSchema>;

export function LoginPage() {
    const auth = useAuth()
    const router = useRouter()
    const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState(false);

    const {
        register,
        handleSubmit,
        formState: {errors},
    } = useForm<LoginForm>({
        resolver: zodResolver(loginSchema),
    });

    const loginMutation = useMutation({
        mutationFn: authService.login,
        onSuccess: async (data) => {
            await auth.login(data!.access_token)
            await router.invalidate()

            toast.success('Successfully logged in!');

            navigate({to: '/dashboard'});
        },
        onError: (error) => {
            // @ts-ignore
            const error_details = error.response.data.detail.details
            toast.error(`Failed to login. ${error_details}`);
        },
    });

    const onSubmit = async (data: LoginForm) => {
        loginMutation.mutate(data);
    };
    return (
        <>
            {/* Background image with opacity - moved to cover entire page */}
            <div
                className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-25"
                style={{
                    backgroundImage: "url('https://images.unsplash.com/photo-1707343843437-caacff5cfa74')",
                }}
            />

            {/* Content */}
            <div className="relative">
                <div className="flex flex-col items-center justify-center min-h-svh p-4">
                    <div className="w-full max-w-sm rounded-xl shadow-2xl">
                        <Card>
                            <CardHeader className="text-center">
                                <CardTitle className="text-xl"> Xenoptics HR</CardTitle>
                                <CardDescription>
                                    Welcome Back
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                <form onSubmit={handleSubmit(onSubmit)}>
                                    <div className="grid gap-6">
                                        <div className="grid gap-6">
                                            <div className="grid gap-2">
                                                <Label htmlFor="email">Email</Label>
                                                <Input
                                                    id="email"
                                                    {...register('email')}
                                                    placeholder="m@example.com"

                                                    autoComplete="email"
                                                    required
                                                />
                                                {errors.email && (
                                                    <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>
                                                )}
                                            </div>
                                            <div className="grid gap-2">
                                                <div className="flex items-center">
                                                    <Label htmlFor="password">Password</Label>
                                                    <a
                                                        href="#"
                                                        className="ml-auto text-sm underline-offset-4 hover:underline"
                                                    >
                                                        Forgot your password?
                                                    </a>
                                                </div>
                                                <div className="relative mt-1">
                                                    <Input
                                                        id="password"
                                                        type={showPassword ? "text" : "password"}
                                                        {...register('password')}
                                                        autoComplete="current-password"
                                                        required
                                                    />
                                                    <Button
                                                        type="button"
                                                        variant="ghost"
                                                        size="sm"
                                                        className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                                                        onClick={() => setShowPassword(!showPassword)}
                                                    >
                                                        {showPassword ? (
                                                            <EyeOff className="h-4 w-4 text-gray-500"/>
                                                        ) : (
                                                            <Eye className="h-4 w-4 text-gray-500"/>
                                                        )}
                                                    </Button>
                                                </div>
                                                {errors.password && (
                                                    <p className="mt-1 text-sm text-red-600">{errors.password.message}</p>
                                                )}
                                            </div>
                                            <Button
                                                className="w-full"
                                                type="submit"
                                                disabled={loginMutation.isPending}
                                            >
                                                {loginMutation.isPending ? (
                                                    <div className="flex items-center justify-center gap-2">
                                                        <span className="animate-spin">⏳</span>
                                                        <span>Logging in...</span>
                                                    </div>
                                                ) : (
                                                    'Login'
                                                )}
                                            </Button>
                                        </div>
                                        <div
                                            className="relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t after:border-border">
                                    <span className="relative z-10 bg-background px-2 text-muted-foreground">
                                        Or continue with
                                    </span>
                                        </div>
                                        <div className="flex flex-col gap-4">
                                            <Button variant="outline" className="w-full">
                                                <img src="public/assets/microsoft.svg" width="24" height="24"
                                                     alt="outlook SVG"/>
                                                Login with Microsoft
                                            </Button>
                                        </div>

                                    </div>
                                </form>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
        </>
    );
}