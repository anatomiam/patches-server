function knob(root, args, context) {
  return context.db.knob({ id: args.knobId });
}

function knobs(root, args, context) {
  return context.db.knobs();
}

function knobsByUser(root, args, context) {
  return context.db
    .user({
      id: args.userId
    })
    .knobs();
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

module.exports = {
  knob,
  knobs,
  knobsByUser,
  knobsByPedal,
  pedal,
  pedals
};
