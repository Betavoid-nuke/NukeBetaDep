"use server"

import { revalidatePath } from "next/cache";
import Thread from "../models/thread.model";
import User from "../models/user.model";
import { connectToDB } from "../mongoose"
import Projects from "../models/projects.model";
import Assemblies from "../models/assemblies.model";
import AIchatH from "../models/aichathistory.model";


interface Params {
    text: string,
    author: string,
    communityId: string | null,
    path: string,
    postid: string
}

export async function createThread({ text, author, communityId, path, postid }: Params) {

    try {
        
        connectToDB();

        //creating thread model and passing to the mongodb
        const CreatedThread = await Thread.create({
            text,
            author,
            community: null,
        });

        //update user model aka pushing it to the database
        //we find the user who is creating this thread and then in the user model, we push the thread model id, thats how we know which threads are created by this user
        await User.findByIdAndUpdate(author, {
            $push: { threads: CreatedThread._id }
        })

        revalidatePath(path);

    } catch (error: any) {
        throw new Error(`Error creating new post: ${error.message}`);
    }

    

}


export async function fetchPost(pageNumber = 1, pageSize = 20) {
    connectToDB();

    //calculate the number of post to skip
    const skipAmount = (pageNumber -1) * pageSize;

    // get all the threads from the db, each thread has a parent id, if the thread is a comment it will have a parent id, so here we are just getting the parent threds by giving condition - parantId: { $in: [null, undefined] }
    const postsQuery = Thread.find({ parantId: { $in: [null, undefined] } })
        .sort({ createdAt: 'desc'})
        .skip(skipAmount)
        .limit(pageSize)
        .populate({ path: 'author', model: User })
        .populate({ path: 'children',
            populate: {
                path: 'author',
                model: User,
                select: "_id name parentId image"
            } 
        })

    const titalPostCount = await Thread.countDocuments({ parantId: { $in: [null, undefined] } })
    const posts = await postsQuery.exec();
    const isNext = titalPostCount > skipAmount + posts.length;

    return { posts, isNext }

}


export async function fetchProject(pageNumber = 1, pageSize = 50) {
  connectToDB();
  //calculate the number of post to skip
  const skipAmount = (pageNumber -1) * pageSize;
  // get all the threads from the db, each thread has a parent id, if the thread is a comment it will have a parent id, so here we are just getting the parent threds by giving condition - parantId: { $in: [null, undefined] }
  const postsQuery = Projects.find()
      .sort({ createdAt: 'desc'})
      .skip(skipAmount)
      .limit(pageSize)
      .populate({ path: 'author', model: User })
  const titalPostCount = await Projects.countDocuments({ parantId: { $in: [null, undefined] } })
  const projects = await postsQuery.exec();
  const isNext = titalPostCount > skipAmount + projects.length;
  return { projects, isNext }
}


export async function fetchAssemblies(pageNumber = 1, pageSize = 50) {

    connectToDB();
    const skipAmount = (pageNumber -1) * pageSize;

    const postsQuery = Assemblies.find()
        .sort({ createdAt: 'desc'})
        .skip(skipAmount)
        .limit(pageSize)
        .populate({ path: 'author', model: User })

    const titalPostCount = await Assemblies.countDocuments({ parantId: { $in: [null, undefined] } })
    const Assembly = await postsQuery.exec();
    const isNext = titalPostCount > skipAmount + Assembly.length;

    return { Assembly, isNext }

}


export async function fetchAIChatHistory(pageNumber = 1, pageSize = 50) {
    connectToDB();

    //calculate the number of post to skip
    const skipAmount = (pageNumber -1) * pageSize;

    // get all the threads from the db, each thread has a parent id, if the thread is a comment it will have a parent id, so here we are just getting the parent threds by giving condition - parantId: { $in: [null, undefined] }
    const postsQuery = AIchatH.find({ parent: { $in: [null, undefined] } })
        .sort({ createdAt: 'desc'})
        .skip(skipAmount)
        .limit(pageSize)
        .populate({ path: 'author', model: User })

    const titalPostCount = await AIchatH.countDocuments({ parantId: { $in: [null, undefined] } })
    const projects = await postsQuery.exec();
    const isNext = titalPostCount > skipAmount + projects.length;

    return { projects, isNext }

}


export async function fetchThreadById(id: string) {
    connectToDB();
    try {

        //too - populate community

        const thread = await Thread.findById(id)
            .populate({
                path: 'author',
                model: User,
                select: "_id id name image"
            })
            .populate({
                path: 'children',
                populate: [
                    {
                        path: 'author',
                        model: User,
                        select: "_id id name parentId image"
                    },
                    {
                        path: 'children',
                        model: Thread,
                        populate: {
                            path: 'author',
                            model: User,
                            select: "_id id name parentId image"
                        }
                    }
                ]
            }).exec();

            return thread;

    } catch (error: any) {
        throw new Error(`Error fetching threadL ${error.message}`)
    }
}


export async function fetchAssemblyById(id: string) {
    connectToDB();
    try {
        const assembly = await Assemblies.findById(id);
            return assembly;
    } catch (error: any) {
        throw new Error(`Error fetching assembly ${error.message}`)
    }
}


export async function addCommentToThread(
    threadId: string,
    commentText: string,
    userId: string,
    path: string
  ) {
    connectToDB();
  
    try {
      // Find the original thread by its ID
      const originalThread = await Thread.findById(threadId);
  
      if (!originalThread) {
        throw new Error("Thread not found");
      }
  
      // Create the new comment thread
      const commentThread = new Thread({
        text: commentText,
        author: userId,
        parentId: threadId, // Set the parentId to the original thread's ID
      });
  
      // Save the comment thread to the database
      const savedCommentThread = await commentThread.save();
  
      // Add the comment thread's ID to the original thread's children array
      originalThread.children.push(savedCommentThread._id);
  
      // Save the updated original thread to the database
      await originalThread.save();
  
      revalidatePath(path);
    } catch (err) {
      console.error("Error while adding comment:", err);
      throw new Error("Unable to add comment");
    }
}


export async function likeThread(
    threadId: string,
    userId: string
  ) {

  connectToDB();

  try {
    // Find the original thread by its ID
    const originalThread = await Thread.findById(threadId);
  
    if (!originalThread) {
      throw new Error("Thread not found");
    }
  
    // Add the user to likedBy array in the thread
    originalThread.likedBy.push(userId);
  
    // Save the updated original thread to the database
    await originalThread.save();

  } catch (err) {
    console.error("Error liking the post:", err);
    throw new Error("Unable to like post");
  }

}


export async function unlikeThread(
  threadId: string,
  userId: string
) {
  connectToDB();
  

  try {

    // Find the original thread by its ID
    const originalThread = await Thread.findById(threadId);

    if (!originalThread) {
      throw new Error("Thread not found");
    }

    // Find the index of the userId in the likedBy array
    const index = originalThread.likedBy.indexOf(userId);

    // Remove the userId from the likedBy array using splice
    if (index !== -1) {
      originalThread.likedBy.splice(index, 1);
    }

    // Save the updated original thread to the database
    await originalThread.save();

  } catch (err) {
    console.error("Error unliking the post:", err);
    throw new Error("Unable to unlike post");
  }
}


async function fetchAllChildThreads(threadId: string): Promise<any[]> {
    const childThreads = await Thread.find({ parentId: threadId });
  
    const descendantThreads = [];
    for (const childThread of childThreads) {
      const descendants = await fetchAllChildThreads(childThread._id);
      descendantThreads.push(childThread, ...descendants);
    }
  
    return descendantThreads;
}


//pathname is litrally just the url
export async function deleteThread({ text, author, communityId, path, postid }: Params): Promise<void> {
    try {
      connectToDB();
  
      // Find the thread to be deleted (the main thread)
      const mainThread = await Thread.findById(postid).populate("author community");
  
      if (!mainThread) {
        throw new Error("Thread not found");
      }
  
      // Fetch all child threads and their descendants recursively
      const descendantThreads = await fetchAllChildThreads(postid);
  
      // Get all descendant thread IDs including the main thread ID and child thread IDs
      const descendantThreadIds = [
        postid,
        ...descendantThreads.map((thread) => thread._id),
      ];
  
      // Extract the authorIds and communityIds to update User and Community models respectively
      const uniqueAuthorIds = new Set(
        [
          ...descendantThreads.map((thread) => thread.author?._id?.toString()), // Use optional chaining to handle possible undefined values
          mainThread.author?._id?.toString(),
        ].filter((id) => id !== undefined)
      );
  
      const uniqueCommunityIds = new Set(
        [
          ...descendantThreads.map((thread) => thread.community?._id?.toString()), // Use optional chaining to handle possible undefined values
          mainThread.community?._id?.toString(),
        ].filter((id) => id !== undefined)
      );
  
      // Recursively delete child threads and their descendants
      await Thread.deleteMany({ _id: { $in: descendantThreadIds } });
  
      // Update User model
      await User.updateMany(
        { _id: { $in: Array.from(uniqueAuthorIds) } },
        { $pull: { threads: { $in: descendantThreadIds } } }
      );
  
      revalidatePath(path);
    } catch (error: any) {
      throw new Error(`Failed to delete thread: ${error.message}`);
    }
}

//pathname is litrally just the url, figureout how to use this function
export async function deleteProject({ text, author, communityId, path, postid }: Params): Promise<void> {
    try {
      connectToDB();
  
      const mainProject = await Projects.findById(postid);
      
      //delete assembly
      if(mainProject == null){
        const mainAssembly = await Assemblies.findById(postid)

        //delete all child projects inside the assembly
        for (let index = 0; index < mainAssembly.children.length; index++) {
          const mainProject = await Projects.findById(mainAssembly.children[index].valueOf());
          await Projects.deleteOne(mainProject);
        }

        await Assemblies.deleteOne(mainAssembly);

      }

      //delete project
      if(mainProject !== null){
        await Projects.deleteOne(mainProject);
      }

      revalidatePath(path);
      
    } catch (error: any) {
      throw new Error(`Failed to delete thread: ${error.message}`);
    }
}


export async function likethepost() {
  console.log('yes');
  
}