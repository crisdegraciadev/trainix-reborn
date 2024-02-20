"use client";

import { Button } from "@components/ui/button";
import { Input } from "@components/ui/input";
import { Label } from "@components/ui/label";
import { Workout } from "@typings/entities";
import { Badge } from "@components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@components/ui/tabs";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@components/ui/card";
import { Separator } from "@components/ui/separator";
import {
  ArrowBigDown,
  ArrowBigUp,
  CheckCircle2,
  CircleDot,
  CircleEqual,
  Equal,
  Minus,
  MoveRight,
  PauseCircle,
  Plus,
  TrendingDown,
  TrendingUp,
  XCircle,
} from "lucide-react";
import WorkoutResume from "./workout-details/workout-resume";

type Props = {
  workout: Workout;
};

export default function WorkoutDetails({ workout }: Props) {
  return (
    <Tabs defaultValue="resume" className="w-full">
      <TabsList className="grid w-full grid-cols-4">
        <TabsTrigger value="resume">Resume</TabsTrigger>
        <TabsTrigger value="progression">Progression</TabsTrigger>
        <TabsTrigger value="exercises">Exercises</TabsTrigger>
        <TabsTrigger value="resources">Resources</TabsTrigger>
      </TabsList>
      <TabsContent value="resume">
        <WorkoutResume workout={workout} />
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
