import { getProjectId } from "@/app/(root)/view-project-flow/[id]/page";
import { fetchProjectById } from "@/lib/actions/projectactions";

//pulling saved project ---------------------------------
export var savedNodes:any = []
export var savedEdges:any = []
export var savedPrompt:any = []
export var savedValues:any = []
export var Name:any = ""

export async function SavedDetails(){
  if (getProjectId().projectid) {
    const saved = await fetchProjectById(getProjectId().projectid);
    savedNodes = saved.Nodes;
  }
  return {savedNodes}
}

export async function SavedEdgesdetails(){
  if (getProjectId().projectid) {
    const saved = await fetchProjectById(getProjectId().projectid);
    savedEdges = saved.Edges;
  }
  return {savedEdges}
}

export async function SavedPromptdetails(){
  if (getProjectId().projectid) {
    const saved = await fetchProjectById(getProjectId().projectid);
    savedPrompt = saved.Prompt;
  }
  return {savedPrompt}
}

export async function SavedValuesdetails(){
  if (getProjectId().projectid) {
    const saved = await fetchProjectById(getProjectId().projectid);
    savedValues = saved.jsonextract;
  }
  return {savedValues}
}

export async function GetProjectName(){
  if (getProjectId().projectid) {
    const saved = await fetchProjectById(getProjectId().projectid);
    Name = await saved.text;
  }
  return Name
}