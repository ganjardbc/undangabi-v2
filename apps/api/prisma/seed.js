const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function main() {
  console.log("Seeding roles and permissions...");

  // 1. Create permissions
  const permissionsData = [
    { name: "Manage Users", slug: "manage_users" },
    { name: "Manage Templates", slug: "manage_templates" },
    { name: "Manage All Invitations", slug: "manage_all_invitations" },
    { name: "View Global Analytics", slug: "view_global_analytics" },
    { name: "Manage Own Invitations", slug: "manage_own_invitations" },
    { name: "Manage Own Guests", slug: "manage_own_guests" },
    { name: "Manage Own RSVP", slug: "manage_own_rsvp" },
    { name: "View Own Analytics", slug: "view_own_analytics" },
  ];

  const permissions = {};
  for (const item of permissionsData) {
    const perm = await prisma.permission.upsert({
      where: { slug: item.slug },
      update: {},
      create: item,
    });
    permissions[item.slug] = perm;
  }
  console.log("Permissions seeded successfully.");

  // 2. Create roles
  const customerRole = await prisma.role.upsert({
    where: { slug: "customer" },
    update: {},
    create: {
      name: "Customer",
      slug: "customer",
      description: "Customer role with access to own invitations",
    },
  });

  const adminRole = await prisma.role.upsert({
    where: { slug: "admin" },
    update: {},
    create: {
      name: "Admin",
      slug: "admin",
      description: "Admin role with access to all invitations and users",
    },
  });
  console.log("Roles seeded successfully.");

  // 3. Assign permissions to Customer role
  const customerPerms = [
    "manage_own_invitations",
    "manage_own_guests",
    "manage_own_rsvp",
    "view_own_analytics",
  ];
  for (const slug of customerPerms) {
    const perm = permissions[slug];
    if (perm) {
      await prisma.rolePermission.upsert({
        where: {
          roleId_permissionId: {
            roleId: customerRole.id,
            permissionId: perm.id,
          },
        },
        update: {},
        create: {
          roleId: customerRole.id,
          permissionId: perm.id,
        },
      });
    }
  }

  // 4. Assign permissions to Admin role (all permissions)
  for (const slug of Object.keys(permissions)) {
    const perm = permissions[slug];
    if (perm) {
      await prisma.rolePermission.upsert({
        where: {
          roleId_permissionId: {
            roleId: adminRole.id,
            permissionId: perm.id,
          },
        },
        update: {},
        create: {
          roleId: adminRole.id,
          permissionId: perm.id,
        },
      });
    }
  }

  console.log("Role permissions seeded successfully.");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
