import { Button, Dropdown } from 'flowbite-react';
import { useEffect, useState } from 'react';
import { CheckIcon, DownArrowIcon } from '@/components/icons';
import { Community } from '@/core/@types/community';

const undefinedCommunity: Community = { id: 0, name: 'Choose a community' };

export type CommunityDropdownProps = {
  communities: Community[];
  community?: Community;
  onSelectCommunity: (community: Community) => void;
  outline?: boolean;
  disabled?: boolean;
};

export default function CommunityDropdown({
  communities,
  community,
  onSelectCommunity,
  outline,
  disabled,
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
    <Dropdown
      label="Community"
      color="success"
      inline={!outline}
      disabled={disabled}
      renderTrigger={
        outline
          ? () => (
              <Button
                className="button-success no-border animate whitespace-nowrap w-full h-10 lg:w-fit"
                outline
              >
                <div className="flex items-center gap-2">
                  <span>{_community.name}</span>
                  {DownArrowIcon}
                </div>
              </Button>
            )
          : undefined
      }
    >
      {!communities.length && (
        <Dropdown.Item className="inactive">
          <div className="min-w-[200px] text-start flex items-center gap-4 justify-between">
            {undefinedCommunity.name}
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
