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
module.exports = {
  knob,
  knobs,
  knobsByUser
};
