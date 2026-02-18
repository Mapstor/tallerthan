interface SchemaMarkupProps {
  schemas: object[];
}

export default function SchemaMarkup({ schemas }: SchemaMarkupProps) {
  if (!schemas || schemas.length === 0) {
    return null;
  }

  return (
    <>
      {schemas.map((schema, index) => (
        <script
          key={index}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      ))}
    </>
  );
}
