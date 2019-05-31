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
    width: args.width,
    height: args.height
  });
}

module.exports = {
  createKnob,
  createUser,
  createPedal
};
