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

module.exports = {
  knob,
  knobs,
  knobsByPedal,
  pedal,
  pedals
};
