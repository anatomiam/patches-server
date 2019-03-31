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

module.exports = {
  createKnob,
  createUser
};
