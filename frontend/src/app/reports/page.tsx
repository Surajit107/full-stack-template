'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { FileText, Download, Calendar, Filter } from 'lucide-react';

export default function ReportsPage() {
  return (
    <div className="container mx-auto py-4 px-4 lg:py-8 lg:px-6">
      <div className="mb-6 lg:mb-8">
        <h1 className="text-2xl lg:text-3xl font-bold tracking-tight">Reports</h1>
        <p className="text-muted-foreground text-sm lg:text-base">
          Generate and manage system reports
        </p>
      </div>

      <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <FileText className="h-5 w-5" />
              <span>User Report</span>
            </CardTitle>
            <CardDescription>
              Comprehensive user data and statistics
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between text-sm">
              <span>Last generated:</span>
              <span className="text-muted-foreground">2 hours ago</span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span>Records:</span>
              <span className="text-muted-foreground">1,234 users</span>
            </div>
            <Button className="w-full" size="sm">
              <Download className="h-4 w-4 mr-2" />
              Download Report
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Calendar className="h-5 w-5" />
              <span>Activity Report</span>
            </CardTitle>
            <CardDescription>
              User activity and engagement metrics
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between text-sm">
              <span>Last generated:</span>
              <span className="text-muted-foreground">1 day ago</span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span>Period:</span>
              <span className="text-muted-foreground">Last 30 days</span>
            </div>
            <Button className="w-full" size="sm">
              <Download className="h-4 w-4 mr-2" />
              Download Report
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Filter className="h-5 w-5" />
              <span>Custom Report</span>
            </CardTitle>
            <CardDescription>
              Create custom reports with filters
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between text-sm">
              <span>Status:</span>
              <span className="text-muted-foreground">Not generated</span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span>Type:</span>
              <span className="text-muted-foreground">Custom</span>
            </div>
            <Button className="w-full" size="sm" variant="outline">
              <FileText className="h-4 w-4 mr-2" />
              Create Report
            </Button>
          </CardContent>
        </Card>
      </div>

      <div className="mt-8">
        <Card>
          <CardHeader>
            <CardTitle>Report History</CardTitle>
            <CardDescription>
              Recently generated reports
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { name: 'User Report', date: '2024-01-15', size: '2.3 MB', type: 'PDF' },
                { name: 'Activity Report', date: '2024-01-14', size: '1.8 MB', type: 'PDF' },
                { name: 'System Report', date: '2024-01-13', size: '3.1 MB', type: 'PDF' },
              ].map((report, index) => (
                <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="flex items-center space-x-3">
                    <FileText className="h-4 w-4 text-muted-foreground" />
                    <div>
                      <div className="font-medium">{report.name}</div>
                      <div className="text-sm text-muted-foreground">{report.date}</div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                    <span className="text-sm text-muted-foreground">{report.size}</span>
                    <span className="text-sm text-muted-foreground">{report.type}</span>
                    <Button size="sm" variant="ghost">
                      <Download className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}