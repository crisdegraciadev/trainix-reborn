"use client";

import { Button } from "@components/ui/button";
import { Input } from "@components/ui/input";
import { Label } from "@components/ui/label";
import { Workout } from "@typings/entities";
import { Badge } from "@components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@components/ui/tabs";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@components/ui/card";

type Props = {
  workout: Workout;
};

const activities = [
  {
    name: "Pull Ups",
    sets: 4,
    reps: 12,
    total: 48,
  },
  {
    name: "Band Assisted Pull Ups",
    sets: 2,
    reps: 8,
    total: 16,
  },
  {
    name: "Straight Bar Dips",
    sets: 4,
    reps: 10,
    total: 16,
  },
  {
    name: "Rows",
    sets: 3,
    reps: 15,
    total: 16,
  },
];

export default function WorkoutDetails({ workout }: Props) {
  return (
    <Tabs defaultValue="account" className="w-full">
      <TabsList className="grid w-full grid-cols-4">
        <TabsTrigger value="resume">Resume</TabsTrigger>
        <TabsTrigger value="exercises">Exercises</TabsTrigger>
        <TabsTrigger value="resources">Resources</TabsTrigger>
        <TabsTrigger value="progression">Progression</TabsTrigger>
      </TabsList>
      <TabsContent value="resume">
        <Card className="min-h-[650px]">
          <CardHeader>
            <CardTitle>Resume</CardTitle>
            <CardDescription>Sum up of your workout will be displayed here in detail.</CardDescription>
          </CardHeader>
          <CardContent className="flex gap-16">
            <div className="w-1/3">
              <h4 className="text-lg font-semibold mb-2">Description</h4>
              <p className="text-sm mb-6">{workout.description}</p>

              <h4 className="text-lg font-semibold mb-2">Difficulty</h4>
              <Badge className="mb-6">{workout.difficulty.name}</Badge>

              <h4 className="text-lg font-semibold mb-2">Muscles</h4>
              {workout.muscles.map(({ name }, idx) => (
                <Badge key={idx} variant="outline" className="me-1">
                  {name}
                </Badge>
              ))}
            </div>
            <div className="w-2/3">
              <h4 className="scroll-m-20 text-lg font-semibold tracking-tight mb-4">Exercises</h4>
              <div className="rounded-md border">
                <Table>
                  {/* <TableCaption>List of sets and reps.</TableCaption> */}
                  <TableHeader>
                    <TableRow>
                      <TableHead>Name</TableHead>
                      <TableHead className="w-[50px]">Sets</TableHead>
                      <TableHead className="w-[50px]">Reps</TableHead>
                      <TableHead>Total</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {activities.map((activity) => (
                      <TableRow key={activity.name}>
                        <TableCell className="font-medium">{activity.name}</TableCell>
                        <TableCell>{activity.sets}</TableCell>
                        <TableCell>{activity.reps}</TableCell>
                        <TableCell>{activity.sets * activity.reps}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </div>
          </CardContent>
        </Card>
      </TabsContent>
      <TabsContent value="exercises">
        <Card>
          <CardHeader>
            <CardTitle>Password</CardTitle>
            <CardDescription>Change your password here. After saving, youll be logged out.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="space-y-1">
              <Label htmlFor="current">Current password</Label>
              <Input id="current" type="password" />
            </div>
            <div className="space-y-1">
              <Label htmlFor="new">New password</Label>
              <Input id="new" type="password" />
            </div>
          </CardContent>
          <CardFooter>
            <Button>Save password</Button>
          </CardFooter>
        </Card>
      </TabsContent>
      <TabsContent value="progression">
        <Card>
          <CardHeader>
            <CardTitle>Password</CardTitle>
            <CardDescription>Change your password here. After saving, youll be logged out.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="space-y-1">
              <Label htmlFor="current">Current password</Label>
              <Input id="current" type="password" />
            </div>
            <div className="space-y-1">
              <Label htmlFor="new">New password</Label>
              <Input id="new" type="password" />
            </div>
          </CardContent>
          <CardFooter>
            <Button>Save password</Button>
          </CardFooter>
        </Card>
      </TabsContent>
    </Tabs>
  );
}
