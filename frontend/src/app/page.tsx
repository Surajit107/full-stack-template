'use client';

import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/loading";
import { Users, Database, Shield, Zap, Palette } from "lucide-react";
import Link from "next/link";
import { useUserStore } from "@/stores/userStore";
import { ProtectedRoute } from "@/components/auth/ProtectedRoute";

export default function HomePage() {
  const { total, fetchUsers, loading } = useUserStore();

  useEffect(() => {
    // Fetch users on component mount
    fetchUsers({
      page: 1,
      limit: 20,
    });
  }, [fetchUsers]);

  return (
    <ProtectedRoute>
      <div className="container mx-auto py-4 px-4 lg:py-8 lg:px-6">
        <div className="mb-6 lg:mb-8">
          <h1 className="text-2xl lg:text-3xl font-bold tracking-tight">Dashboard</h1>
          <p className="text-muted-foreground text-sm lg:text-base">
            Welcome to your user management system
          </p>
        </div>

        <div className="grid gap-3 lg:gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-xs lg:text-sm font-medium">Total Users</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-xl lg:text-2xl font-bold">
                {loading ? (
                  <Skeleton className="h-6 lg:h-8 w-12 lg:w-16" />
                ) : (
                  total
                )}
              </div>
              <p className="text-xs text-muted-foreground">
                Manage your user base
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-xs lg:text-sm font-medium">Database</CardTitle>
              <Database className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-xl lg:text-2xl font-bold">MongoDB</div>
              <p className="text-xs text-muted-foreground">
                Cloud database
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-xs lg:text-sm font-medium">Security</CardTitle>
              <Shield className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-xl lg:text-2xl font-bold">JWT</div>
              <p className="text-xs text-muted-foreground">
                Authentication
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-xs lg:text-sm font-medium">Performance</CardTitle>
              <Zap className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-xl lg:text-2xl font-bold">Fast</div>
              <p className="text-xs text-muted-foreground">
                Optimized for speed
              </p>
            </CardContent>
          </Card>
        </div>

        <div className="mt-6 lg:mt-8 grid gap-4 grid-cols-1 lg:grid-cols-2">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center space-x-2 text-base lg:text-lg">
                <Palette className="h-4 w-4 lg:h-5 lg:w-5" />
                <span>Modern UI</span>
              </CardTitle>
              <CardDescription className="text-sm">
                Built with shadcn/ui components
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-xs lg:text-sm text-muted-foreground">
                This application features a modern, accessible design system with dark mode support and responsive layout.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center space-x-2 text-base lg:text-lg">
                <Users className="h-4 w-4 lg:h-5 lg:w-5" />
                <span>User Management</span>
              </CardTitle>
              <CardDescription className="text-sm">
                Complete CRUD operations
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-xs lg:text-sm text-muted-foreground">
                Create, read, update, and delete users with advanced search, filtering, and pagination capabilities.
              </p>
              <div className="mt-4">
                <Button asChild size="sm" className="w-full sm:w-auto">
                  <Link href="/users">
                    Manage Users
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </ProtectedRoute>
  );
}
