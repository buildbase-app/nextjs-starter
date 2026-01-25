import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db';

type EventType =
  | 'user:created'
  | 'user:updated'
  | 'workspace:created'
  | 'workspace:updated'
  | 'workspace:deleted'
  | 'workspace:changed'
  | 'workspace:user-added'
  | 'workspace:user-removed'
  | 'workspace:user-role-changed';

interface IUser {
  _id: string;
  name: string;
  email: string;
  role: string;
}

interface IWorkspace {
  _id: string;
  name: string;
  workspaceId: string;
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { eventType, data } = body as { eventType: EventType; data: unknown };

    switch (eventType) {
      case 'user:created': {
        const { user } = data as { user: IUser };
        await prisma.user.upsert({
          where: { id: user._id },
          update: {
            email: user.email,
            name: user.name,
            role: user.role,
          },
          create: {
            id: user._id,
            email: user.email,
            name: user.name,
            role: user.role,
          },
        });
        break;
      }

      case 'user:updated': {
        const { user } = data as { user: IUser };
        await prisma.user.upsert({
          where: { id: user._id },
          update: {
            email: user.email,
            name: user.name,
            role: user.role,
          },
          create: {
            id: user._id,
            email: user.email,
            name: user.name,
            role: user.role,
          },
        });
        break;
      }

      case 'workspace:created': {
        const { workspace } = data as { workspace: IWorkspace };
        await prisma.workspace.upsert({
          where: { id: workspace._id },
          update: { name: workspace.name },
          create: {
            id: workspace._id,
            name: workspace.name,
          },
        });
        break;
      }

      case 'workspace:updated': {
        const { workspace } = data as { workspace: IWorkspace };
        await prisma.workspace.upsert({
          where: { id: workspace._id },
          update: { name: workspace.name },
          create: {
            id: workspace._id,
            name: workspace.name,
          },
        });
        break;
      }

      case 'workspace:deleted': {
        const { workspace } = data as { workspace: IWorkspace };
        await prisma.workspace
          .delete({
            where: { id: workspace._id },
          })
          .catch(() => {
            // Workspace may not exist in our DB
          });
        break;
      }

      case 'workspace:user-added': {
        const { userId, workspace, role } = data as {
          userId: string;
          workspace: IWorkspace;
          role: string;
        };

        // Ensure workspace exists
        await prisma.workspace.upsert({
          where: { id: workspace._id },
          update: { name: workspace.name },
          create: {
            id: workspace._id,
            name: workspace.name,
          },
        });

        // Add user to workspace
        await prisma.userWorkspace.upsert({
          where: {
            userId_workspaceId: {
              userId,
              workspaceId: workspace._id,
            },
          },
          update: { userRole: role },
          create: {
            userId,
            workspaceId: workspace._id,
            userRole: role,
          },
        });
        break;
      }

      case 'workspace:user-removed': {
        const { userId, workspace } = data as {
          userId: string;
          workspace: IWorkspace;
        };
        await prisma.userWorkspace
          .delete({
            where: {
              userId_workspaceId: {
                userId,
                workspaceId: workspace._id,
              },
            },
          })
          .catch(() => {
            // Record may not exist
          });
        break;
      }

      case 'workspace:user-role-changed': {
        const { userId, workspace, newRole } = data as {
          userId: string;
          workspace: IWorkspace;
          previousRole: string;
          newRole: string;
        };
        await prisma.userWorkspace.update({
          where: {
            userId_workspaceId: {
              userId,
              workspaceId: workspace._id,
            },
          },
          data: { userRole: newRole },
        });
        break;
      }

      case 'workspace:changed': {
        const { workspace } = data as { workspace: IWorkspace };
        if (workspace) {
          await prisma.workspace.upsert({
            where: { id: workspace._id },
            update: { name: workspace.name },
            create: {
              id: workspace._id,
              name: workspace.name,
            },
          });
        }
        break;
      }

      default:
        console.log('Unknown event type:', eventType);
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Event handling error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to process event' },
      { status: 500 }
    );
  }
}
