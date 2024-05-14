"use client";

import * as z from "zod";
import Image from "next/image";
import { useForm } from "react-hook-form";
import { usePathname, useRouter } from "next/navigation";
import { ChangeEvent, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

import { useUploadThing } from "@/lib/uploadthing";
import { isBase64Image } from "@/lib/utils";

import { updateUser } from "@/lib/actions/user.action";
import { createProject } from "@/lib/actions/projectactions";
import { ProjectValidation } from "@/lib/validations/project";
import { aichathistory } from "@/lib/actions/aichathistory";

interface Props {
  authorID: string;
  userinput: string;
  aireply: string;
  markedimportent: boolean;
  tag: string;
}

async function SubmitaichatH({
  authorID,
  userinput,
  aireply,
  markedimportent,
  tag
}: Props) {

  await aichathistory({
    author: authorID,
    userinput: userinput,
    aireply: aireply,
    markedImportent: markedimportent,
    tag: tag,
  });

}

export default SubmitaichatH;
