import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";
import { ThemeProvider } from "@/components/providers/theme-provider";
import { ReduxProvider } from "@/components/providers/redux-provider";
import { ApolloProviderWrapper } from "@/components/providers/apollo-provider";
import { AppLayout } from "@/components/layout/app-layout";
import { AuthInitializer } from "@/components/auth/AuthInitializer";
import { ConditionalLayout } from "@/components/layout/conditional-layout";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "User Management System",
  description: "A modern user management system built with Next.js and shadcn/ui",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ApolloProviderWrapper>
          <ReduxProvider>
            <ThemeProvider
              attribute="class"
              defaultTheme="system"
              enableSystem
              disableTransitionOnChange
            >
              <AuthInitializer>
                <ConditionalLayout>
                  {children}
                </ConditionalLayout>
              </AuthInitializer>
              <Toaster />
            </ThemeProvider>
          </ReduxProvider>
        </ApolloProviderWrapper>
      </body>
    </html>
  );
}
