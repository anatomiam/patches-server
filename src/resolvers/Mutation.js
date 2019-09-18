function createKnob(root, args, context) {
  return context.db.createKnob({
    type: args.type,
    description: args.description,
    builder: { connect: { id: args.userId } },
    cx: args.cx
  });
}

function createUser(root, args, context) {
  return context.db.createUser({ name: args.name, email: args.email });
}

function createPedal(root, args, context) {
  return context.db.createPedal({
    name: args.name,
    builder: { connect: { id: args.builder } },
    width: args.width,
    height: args.height,
    color: args.color,
    knobs: { create: args.knobs }
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
        angle: patch.angle
      }))
    }
  });
}

module.exports = {
  createKnob,
  createUser,
  createPedal,
  createPreset
};
