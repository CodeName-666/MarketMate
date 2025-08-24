export type Role = 'admin' | 'helper' | 'seller';

const emailRoleMap: Record<string, Role> = {
  'admin@marketmate.com': 'admin',
  'helper@marketmate.com': 'helper',
};

export async function getRoleForEmail(email: string): Promise<Role> {
  return emailRoleMap[email.toLowerCase()] ?? 'seller';
}

const emailOrganizationMap: Record<string, string> = {
  'admin@flohmarkt-berlin.de': 'flohmarkt-verein-berlin',
  'admin@stadt-hamburg.de': 'stadt-hamburg-events',
};

export async function getOrganizationForEmail(email: string): Promise<string | null> {
  return emailOrganizationMap[email.toLowerCase()] ?? null;
}
