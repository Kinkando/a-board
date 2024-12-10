import { Dropdown } from 'flowbite-react';
import { useEffect, useState } from 'react';
import { CheckIcon } from '@/components/icons';
import { Community } from '@/core/@types/community';

const undefinedCommunity: Community = { id: 0, name: '' };

export type CommunityDropdownProps = {
  communities: Community[];
  community?: Community;
  onSelectCommunity: (community: Community) => void;
  inline?: boolean;
  outline?: boolean;
};

export default function CommunityDropdown({
  communities,
  community,
  onSelectCommunity,
  inline,
  outline,
}: CommunityDropdownProps) {
  const [_community, _setCommunity] = useState<Community>(undefinedCommunity);

  const chooseCommunity = (cmt: Community) => {
    _setCommunity((community) => {
      const selectedCommunity =
        cmt.id === community.id ? undefinedCommunity : cmt;
      onSelectCommunity(selectedCommunity);
      return selectedCommunity;
    });
  };

  useEffect(() => {
    if (community) {
      _setCommunity(community);
    }
  }, [community]);

  return (
    <Dropdown label="Community" inline={inline} outline={outline}>
      {!communities.length && (
        <Dropdown.Item className="inactive">
          <div className="min-w-[200px] text-start flex items-center gap-4 justify-between">
            No Community
          </div>
        </Dropdown.Item>
      )}
      {communities.map((cmt) => (
        <Dropdown.Item
          key={cmt.id}
          className={_community.id === cmt.id ? 'active' : ''}
          onClick={() => chooseCommunity(cmt)}
        >
          <div className="min-w-[200px] text-start flex items-center gap-4 justify-between">
            {cmt.name}
            {_community.id === cmt.id && (
              <div className="stroke-black">{CheckIcon}</div>
            )}
          </div>
        </Dropdown.Item>
      ))}
    </Dropdown>
  );
}
