import { useRouter } from 'next/navigation';
import { Community } from '@/core/@types/community';

export function usePostToolPanel() {
  const router = useRouter();

  const highlight = (search: string) => {
    const regex = new RegExp(search, 'gi');
    const elements = document.getElementsByClassName('post');
    for (const element of elements) {
      const text = element.innerHTML.replace(
        /(<mark class="highlight bg-golden opacity-50">|<\/mark>)/gim,
        '',
      );
      element.innerHTML = text.replace(
        regex,
        '<mark class="highlight bg-golden opacity-50">$&</mark>',
      );
    }
  };

  const replaceQueryParams = async (search: string, community?: Community) => {
    const params = new URLSearchParams();
    if (search.trim()) {
      params.set('search', search.trim());
    } else {
      params.delete('search');
    }
    if (community?.id) {
      params.set('communityId', community.id.toString());
    } else {
      params.delete('communityId');
    }

    router.replace(`?${params.toString()}`);
  };

  return {
    replaceQueryParams,
    highlight,
  };
}
