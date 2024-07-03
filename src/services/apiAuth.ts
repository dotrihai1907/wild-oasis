import { ICreateSignup } from "./apiModel";
import supabase from "./supabase";

type LoginProps = {
  email: string;
  password: string;
};

export type UpdateUserProps = {
  password?: string;
  fullName?: string;
  avatar?: File;
};

type UpdateUser = {
  password?: string;
  data?: {
    fullName?: string;
    avatar?: string;
  };
};

export const signup = async ({ fullName, email, password }: ICreateSignup) => {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        fullName,
        avatar: "",
      },
    },
  });

  if (error) throw new Error(error.message);
  return data;
};

export const login = async ({ email, password }: LoginProps) => {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) throw new Error(error.message);
  return data;
};

export const getCurrentUser = async () => {
  const { data: session } = await supabase.auth.getSession();
  if (!session.session) return null;

  const { data, error } = await supabase.auth.getUser();

  if (error) throw new Error(error.message);
  if (data) return data.user;
};

export const logout = async () => {
  const { error } = await supabase.auth.signOut();
  if (error) throw new Error(error.message);
};

export const updateCurrentUser = async ({
  password,
  fullName,
  avatar,
}: UpdateUserProps) => {
  let updatePasswordName: UpdateUser = {};

  if (password) updatePasswordName = { password };
  if (fullName)
    updatePasswordName = { ...updatePasswordName, data: { fullName } };

  // 1. Update password or full name
  const { data, error } = await supabase.auth.updateUser(updatePasswordName);

  if (error) throw new Error(error.message);
  if (!avatar) return data;

  // 2. Upload avatar image
  const fileName = `avatar-${data.user.id}-${Math.random()}`;

  const { error: storageError } = await supabase.storage
    .from("avatars")
    .upload(fileName, avatar);

  if (storageError) throw new Error(storageError.message);

  // 3. Update avatar in the user
  const updateAvatar: UpdateUser = {
    data: {
      avatar: `https://tymxgddvlgeotlhzismd.supabase.co/storage/v1/object/public/avatars/${fileName}`,
    },
  };

  const { data: updatedUser, error: error2th } = await supabase.auth.updateUser(
    updateAvatar
  );

  if (error2th) throw new Error(error2th.message);
  return updatedUser;
};
