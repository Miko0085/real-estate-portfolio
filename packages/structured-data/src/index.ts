export function webPageSchema(input: { name: string; description: string; url: string }) {
  return { '@context':'https://schema.org', '@type':'WebPage', name:input.name, description:input.description, url:input.url } as const;
}
export function breadcrumbs(items: Array<{ name: string; url: string }>) {
  return {'@context':'https://schema.org','@type':'BreadcrumbList',itemListElement:items.map((item,index)=>({'@type':'ListItem', position:index+1, name:item.name, item:item.url}))};
}
