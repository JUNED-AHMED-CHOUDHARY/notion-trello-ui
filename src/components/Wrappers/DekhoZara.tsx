'use client'

import { useParams, useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function DekhoZara({ fileType, type }) {
  const router = useRouter();
  const param = useParams();
    console.log(param?.slug?.[0], 'slug')

//   useEffect(() => {
//     if (!fileType?.file_id) return;
//     console.log(`type`,type,  'alsfn')
//     router.replace(`/workspace/${param?.slug?.[0]}/${fileType?.file_id}/${type}/${fileType.id}`, {
//       scroll: false,
//     });
//   }, []);

  return <div>asf</div>;
}
