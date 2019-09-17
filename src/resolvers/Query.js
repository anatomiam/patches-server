function knob(root, args, context) {
  return context.db.knob({ id: args.knobId });
}

function knobs(root, args, context) {
  return context.db.knobs();
}

function knobsByPedal(root, args, context) {
  return context.db
    .pedal({
      id: args.pedalId
    })
    .knobs();
}

function pedal(root, args, context) {
  return context.db.pedal({ id: args.pedalId });
}

function pedals(root, args, context) {
  return context.db.pedals();
}

function patch(root, args, context) {
  return context.db.patch({ id: args.patchId });
}

function preset(root, args, context) {
  return context.db.preset({ id: args.presetId });
}

function presetsByUser(root, args, context) {
  return context.db.presets({ where: { user: { id: args.userId } } });
}

module.exports = {
  knob,
  knobs,
  knobsByPedal,
  pedal,
  pedals,
  patch,
  preset,
  presetsByUser
};
