'use client';

import dynamic from 'next/dynamic';
import config from '../../../../sanity.config';

// NextStudio must only render client-side to avoid "window is not defined"
const NextStudio = dynamic(
  () => import('next-sanity/studio').then((mod) => mod.NextStudio),
  { ssr: false }
);

export default function StudioPage() {
  return <NextStudio config={config} />;
}
