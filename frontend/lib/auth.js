export function getAuth() {
  if (typeof window === 'undefined') return null;
  try {
    const stored = window.localStorage.getItem('topAfricaAuth');
    return stored ? JSON.parse(stored) : null;
  } catch (error) {
    console.error('Failed to get auth:', error);
    return null;
  }
}

export function isAdmin() {
  const auth = getAuth();
  return auth?.user?.role === 'admin';
}

export function isReporter() {
  const auth = getAuth();
  return ['reporter', 'editor', 'admin'].includes(auth?.user?.role);
}

export function getUser() {
  const auth = getAuth();
  return auth?.user || null;
}

export function getToken() {
  const auth = getAuth();
  return auth?.token || null;
}

export function logout() {
  if (typeof window !== 'undefined') {
    window.localStorage.removeItem('topAfricaAuth');
  }
}
