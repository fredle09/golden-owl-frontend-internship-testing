"use client";

import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "./ui/form";
import { z } from "zod";
import { Input } from "./ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "./ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "./ui/card";
import { usePathname, useRouter } from "next/navigation";

export const RegistrationForm = () => {
  const pathname = usePathname();
  const router = useRouter();
  const formSchema = z.object({
    sbd: z.coerce.string()
      .min(1, "This field is required")
      .refine((sbd) => /^\d{8}$/.test(sbd), "User ID must be 8 digits"),
  });

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      sbd: "",
    },
  });

  const onSubmit = (data: z.infer<typeof formSchema>) => {
    router.push(`${pathname}?sbd=${data.sbd}`);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>User Registration</CardTitle>
      </CardHeader>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <CardContent>
            <FormField
              control={form.control}
              name="sbd"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Registration Number</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter registration number" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </CardContent>
          <CardFooter>
            <Button>Submit</Button>
          </CardFooter>
        </form>
      </Form>
    </Card>
  );
};
