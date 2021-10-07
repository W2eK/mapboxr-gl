export function withDisplayName(Wrapper, WrappedComponent) {
  const [, name] = Wrapper.name.match(/With(.*)$/);
  // prettier-ignore
  Wrapper.displayName = `with${name}(${WrappedComponent.displayName || WrappedComponent.name || 'Component'})`;
  return Wrapper;
}
