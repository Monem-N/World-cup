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
      redirectTo: `${window.location.origin}/reset-password`,
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
