export function dispatchSelectPackage(packageName: string): void {
  window.dispatchEvent(
    new CustomEvent('selectPackage', { detail: { packageName } })
  );
  document.getElementById('footer')?.scrollIntoView({ behavior: 'smooth' });
}
