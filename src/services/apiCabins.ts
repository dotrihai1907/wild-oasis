import { ICabin, ICreateCabin } from "./apiModel";
import supabase, { supabaseUrl } from "./supabase";

export const getCabins = async () => {
  const { data, error } = await supabase.from("cabins").select("*");

  if (error) throw new Error("Cabins could  not be loaded");

  return data as ICabin[];
};

export const deleteCabin = async (id: number) => {
  const { error } = await supabase.from("cabins").delete().eq("id", id);

  if (error) throw new Error("Cabins could not be deleted");
};

export const createCabin = async (newCabin: ICreateCabin) => {
  let imagePath = "";
  let imageName = "";

  if (typeof newCabin.image === "string") {
    imagePath = newCabin.image;
  } else {
    imageName = `${Math.random()}-${newCabin.image[0].name}`.replace("/", "");
    imagePath = `${supabaseUrl}/storage/v1/object/public/cabin-images/${imageName}`;
  }

  // 1. create cabin
  const { data, error } = await supabase
    .from("cabins")
    .insert([{ ...newCabin, image: imagePath }])
    .select()
    .single();

  if (error) throw new Error("Cabins could not be created");

  // 2. upload image
  if (typeof newCabin.image === "string") return data;

  const { error: storageError } = await supabase.storage
    .from("cabin-images")
    .upload(imageName, newCabin.image[0]);

  // 3. delete the cabin if there was an error uploading image
  const dataEdited = data as unknown as ICabin;

  if (storageError) {
    await supabase.from("cabins").delete().eq("id", dataEdited.id);
    throw new Error(
      "Cabin image could not be uploaded and the cabin was not created"
    );
  }

  return data as ICabin;
};

export const updateCabin = async (editCabin: ICreateCabin, id: number) => {
  let imagePath = "";
  let imageName = "";

  if (typeof editCabin.image === "string") {
    imagePath = editCabin.image;
  } else {
    imageName = `${Math.random()}-${editCabin.image[0].name}`.replace("/", "");
    imagePath = `${supabaseUrl}/storage/v1/object/public/cabin-images/${imageName}`;
  }

  // 1. edit cabin
  const { data, error } = await supabase
    .from("cabins")
    .update({ ...editCabin, image: imagePath })
    .eq("id", id)
    .select()
    .single();

  if (error) throw new Error("Cabins could not be updatted");

  // 2. upload image
  if (typeof editCabin.image === "string") return data;

  const { error: storageError } = await supabase.storage
    .from("cabin-images")
    .upload(imageName, editCabin.image[0]);

  // 3. delete the cabin if there was an error uploading image
  const dataEdited = data as unknown as ICabin;

  if (storageError) {
    await supabase.from("cabins").delete().eq("id", dataEdited.id);
    throw new Error(
      "Cabin image could not be uploaded and the cabin was not edited"
    );
  }

  return data as ICabin;
};
