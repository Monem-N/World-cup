import { supabase } from '../lib/supabase';

export interface SignUpCredentials {
  email: string;
  password: string;
  firstName?: string;
  lastName?: string;
}

export interface SignInCredentials {
  email: string;
  password: string;
}

export async function signUp({ email, password, firstName, lastName }: SignUpCredentials) {
  try {
    // Sign up the user with Supabase Auth
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          first_name: firstName,
          last_name: lastName,
        },
      },
    });

    if (error) {
      throw error;
    }

    return data;
  } catch (error) {
    console.error('Error signing up:', error);
    throw error;
  }
}

export async function signIn({ email, password }: SignInCredentials) {
  try {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      throw error;
    }

    return data;
  } catch (error) {
    console.error('Error signing in:', error);
    throw error;
  }
}

export async function signOut() {
  try {
    const { error } = await supabase.auth.signOut();

    if (error) {
      throw error;
    }

    return true;
  } catch (error) {
    console.error('Error signing out:', error);
    throw error;
  }
}

export async function resetPassword(email: string) {
  try {
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/auth/reset-password`,
    });

    if (error) {
      throw error;
    }

    return true;
  } catch (error) {
    console.error('Error resetting password:', error);
    throw error;
  }
}

export async function updatePassword(newPassword: string) {
  try {
    const { error } = await supabase.auth.updateUser({
      password: newPassword,
    });

    if (error) {
      throw error;
    }

    return true;
  } catch (error) {
    console.error('Error updating password:', error);
    throw error;
  }
}



export async function updateProfile(profile: {
  firstName?: string;
  lastName?: string;
  avatarUrl?: string;
}) {
  try {
    const { data: userData, error: userError } = await supabase.auth.getUser();

    if (userError || !userData.user) {
      throw userError || new Error('User not found');
    }

    const userId = userData.user.id;

    // Update auth metadata
    await supabase.auth.updateUser({
      data: {
        first_name: profile.firstName,
        last_name: profile.lastName,
      },
    });

    // Update profile in the profiles table
    const { error } = await supabase
      .from('profiles')
      .update({
        first_name: profile.firstName,
        last_name: profile.lastName,
        avatar_url: profile.avatarUrl,
        updated_at: new Date().toISOString(),
      })
      .eq('id', userId);

    if (error) {
      throw error;
    }

    return true;
  } catch (error) {
    console.error('Error updating profile:', error);
    throw error;
  }
}

/**
 * Gets the current user's profile
 *
 * @returns Promise resolving to the user's profile
 */
export async function getProfile() {
  try {
    const { data: userData, error: userError } = await supabase.auth.getUser();

    if (userError || !userData.user) {
      throw userError || new Error('User not found');
    }

    const userId = userData.user.id;

    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', userId)
      .single();

    if (error) {
      throw error;
    }

    return data;
  } catch (error) {
    console.error('Error getting profile:', error);
    throw error;
  }
}

/**
 * Uploads an avatar image for the user
 *
 * @param file - The file to upload
 * @returns Promise resolving to the avatar URL
 */
export async function uploadAvatar(file: File) {
  try {
    const { data: userData, error: userError } = await supabase.auth.getUser();

    if (userError || !userData.user) {
      throw userError || new Error('User not found');
    }

    const userId = userData.user.id;
    const fileExt = file.name.split('.').pop();
    const fileName = `${userId}-${Date.now()}.${fileExt}`;
    const filePath = `avatars/${fileName}`;

    // Upload the file to Supabase Storage
    const { error: uploadError } = await supabase.storage
      .from('avatars')
      .upload(filePath, file);

    if (uploadError) {
      throw uploadError;
    }

    // Get the public URL
    const { data: urlData } = supabase.storage
      .from('avatars')
      .getPublicUrl(filePath);

    const avatarUrl = urlData.publicUrl;

    // Update the profile with the new avatar URL
    await updateProfile({ avatarUrl });

    return avatarUrl;
  } catch (error) {
    console.error('Error uploading avatar:', error);
    throw error;
  }
}

/**
 * Checks if the user is authenticated
 *
 * @returns Promise resolving to a boolean indicating if the user is authenticated
 */
export async function isAuthenticated() {
  try {
    const { data, error } = await supabase.auth.getSession();

    if (error) {
      throw error;
    }

    return !!data.session;
  } catch (error) {
    console.error('Error checking authentication:', error);
    return false;
  }
}

/**
 * Sends a magic link to the user's email
 *
 * @param email - The email to send the magic link to
 * @returns Promise resolving to a success message
 */
export async function signInWithMagicLink(email: string) {
  try {
    const { error } = await supabase.auth.signInWithOtp({
      email,
      options: {
        emailRedirectTo: `${window.location.origin}/auth/callback`,
      },
    });

    if (error) {
      throw error;
    }

    return {
      success: true,
      message: `Magic link sent to ${email}`,
    };
  } catch (error: any) {
    console.error('Error sending magic link:', error);
    return {
      success: false,
      message: error.message || 'Failed to send magic link',
    };
  }
}