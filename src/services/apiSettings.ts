import { ISettings, IUpdateSetting } from "./apiModel";
import supabase from "./supabase";

export const getSettings = async () => {
  const { data, error } = await supabase.from("settings").select("*").single();

  if (error) throw new Error("Settings could not be loaded");

  return data as ISettings;
};

export const updateSetting = async (newSetting: IUpdateSetting) => {
  const { data, error } = await supabase
    .from("settings")
    .update(newSetting)
    .eq("id", 1)
    .single();

  if (error) throw new Error("Settings could not be updated");

  return data as ISettings;
};
