import React, { useMemo, useRef } from 'react';
import { Button } from '../index';
import Input, { InputProps } from './Input';

import './style/search.less';

export interface SearchProps extends InputProps {
  enterButton?: boolean | React.ReactNode;
  loading?: boolean;
  onSearch?: (value: string, event: any) => void;
}

export default function Search(props: SearchProps) {
  const { enterButton, loading, onSearch, ...reset } = props;
  const enterButtonIsNode = useMemo(() => {
    return typeof enterButton !== 'boolean' && enterButton;
  }, [enterButton]);
  const searchRef = useRef<any>();

  function handleSearch(event: any) {
    if (onSearch) {
      onSearch(searchRef.current.value, event);
    }
  }

  function renderSearch(): React.ReactNode {
    return (
      <Button
        icon="search"
        type={enterButton ? 'primary' : 'default'}
        loading={loading}
        onClick={handleSearch}
      >
        {enterButtonIsNode && enterButton}
      </Button>
    );
  }

  return (
    <Input
      {...reset}
      className="pq-antd-search"
      addonAfter={renderSearch()}
      size={enterButtonIsNode ? 'large' : 'default'}
      onPressEnter={handleSearch}
      ref={searchRef}
    />
  );
}
