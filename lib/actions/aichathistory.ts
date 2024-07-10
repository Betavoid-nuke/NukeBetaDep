"use server";

import { revalidatePath } from "next/cache";
import Thread from "../models/thread.model";
import User from "../models/user.model";
import { connectToDB } from "../mongoose";
import Projects from "../models/projects.model";
import AIchatH from "../models/aichathistory.model";

interface Params {
  author: string;
  userinput: string;
  aireply: string;
  markedImportent: Boolean;
  tag: string;
}

export async function aichathistory({ author, userinput, aireply, markedImportent, tag }: Params) {
  try {

    connectToDB();

    const Createchathistory = await AIchatH.create({
      author: author,
      userinput: userinput,
      aireply: aireply,
      markedImportent: markedImportent,
      tag: tag,
    });

  } catch (error: any) {
    throw new Error(`Error creating new post: ${error.message}`);
  }
  
}
