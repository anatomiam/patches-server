const bcrypt = require("bcryptjs");
const {
  createAccessToken,
  createRefreshToken,
  sendRefreshToken,
  getUserId
} = require("../utils");

async function signup(root, args, context, info) {
  const password = await bcrypt.hash(args.password, 10);
  const user = await context.db.createUser({ ...args, password });
  const refresh_token = createRefreshToken(user);
  return {
    token: createAccessToken(user),
    user
  };
}

async function login(root, args, context, info) {
  const user = await context.db.user({ email: args.email });
  if (!user) {
    throw new Error("No such user found");
  }
  const valid = await bcrypt.compare(args.password, user.password);
  if (!valid) {
    throw new Error("Invalid password");
  }

  sendRefreshToken(context.res, createRefreshToken(user));

  return {
    token: createAccessToken(user),
    user
  };
}

async function logout(root, args, context, info) {
  sendRefreshToken(context.res, "");
  return true;
}

function createKnob(root, args, context) {
  return context.db.createKnob({
    type: args.type,
    description: args.description,
    builder: { connect: { id: args.userId } },
    cx: args.cx
  });
}

function createPedal(root, args, context) {
  const userId = getUserId(context);
  return context.db.createPedal({
    name: args.name,
    builder: { connect: { id: userId } },
    width: args.width,
    height: args.height,
    color: args.color,
    knobs: { create: args.knobs }
  });
}

function updatePedal(root, args, context) {
  return context.db.updatePedal({
    where: { id: args.id },
    data: {
      name: args.name,
      width: args.width,
      height: args.height,
      color: args.color,
      knobs: {
        create: args.knobsToCreate,
        delete: args.knobsToDelete,
        update: args.knobsToUpdate.map(knob => {
          return {
            where: { id: knob.id },
            data: knob.details
          };
        })
      }
    }
  });
}

function createPreset(root, args, context) {
  return context.db.createPreset({
    name: args.name,
    description: args.description,
    user: { connect: { id: args.user } },
    pedal: { connect: { id: args.pedal } },
    patches: {
      create: args.patches.map(patch => ({
        knob: { connect: { id: patch.knob } },
        position: patch.position,
        notes: patch.notes
      }))
    }
  });
}

function updatePreset(root, args, context) {
  return context.db.updatePreset({
    where: { id: args.id },
    data: {
      name: args.name,
      description: args.description,
      patches: {
        upsert: args.patchesToUpdate.map(patch => {
          return {
            where: { id: patch.id },
            update: {
              position: patch.details.position,
              notes: patch.details.notes
            },
            create: {
              knob: { connect: { id: patch.details.knob } },
              position: patch.details.position,
              notes: patch.details.notes
            }
          };
        })
      }
    }
  });
}

module.exports = {
  signup,
  login,
  logout,
  createKnob,
  createPedal,
  createPreset,
  updatePedal,
  updatePreset
};
