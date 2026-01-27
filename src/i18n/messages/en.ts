import type { Messages } from '../types';

const messages: Messages = {
  common: {
    nav: {
      home: 'Home',
      dashboard: 'Dashboard',
      documents: 'Documents',
      analytics: 'Analytics',
      team: 'Team',
      settings: 'Settings',
    },
    buttons: {
      signIn: 'Sign In',
      signOut: 'Sign Out',
      submit: 'Submit',
      cancel: 'Cancel',
      save: 'Save',
      delete: 'Delete',
      edit: 'Edit',
      create: 'Create',
      loading: 'Loading...',
    },
    auth: {
      signInPrompt: 'Please sign in to continue',
      signOutConfirm: 'Are you sure you want to sign out?',
    },
    footer: {
      rights: 'All rights reserved',
    },
    language: {
      select: 'Select Language',
      current: 'Current language',
    },
    accessibility: {
      skipToContent: 'Skip to content',
    },
  },
  home: {
    title: 'My App',
    hero: {
      heading: 'Welcome to My App',
      description:
        'Built with Next.js, TypeScript, Tailwind CSS, shadcn/ui, next-themes, and BuildBase SDK.',
    },
    meta: {
      title: 'My App',
      description: 'My Next.js application with shadcn/ui and theme support',
      tagline: 'Build something amazing',
    },
  },
  dashboard: {
    title: 'Dashboard',
    welcome: 'Welcome back, {name}!',
    cards: {
      workspace: {
        title: 'Current Workspace',
        empty: 'No workspace selected',
      },
      role: {
        title: 'Your Role',
        empty: 'N/A',
      },
      email: {
        title: 'Email',
      },
      status: {
        title: 'Status',
        active: 'Active',
        inactive: 'Inactive',
      },
    },
    quickActions: {
      title: 'Quick Actions',
      createProject: 'Create Project',
      viewReports: 'View Reports',
      inviteTeam: 'Invite Team Member',
    },
    pages: {
      documents: {
        title: 'Documents',
        description: 'Manage your documents',
      },
      analytics: {
        title: 'Analytics',
        description: 'View your analytics',
      },
      team: {
        title: 'Team',
        description: 'Manage your team',
      },
      settings: {
        title: 'Settings',
        description: 'Manage your settings',
      },
    },
  },
};

export default messages;
