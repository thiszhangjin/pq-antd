import React from 'react';
import Input, { InputProps } from './Input';
import Password from './Password';
import Search from './Search';
import './style/index.less';

export default function RefInput(props: InputProps) {
  return <Input {...props} />;
}

RefInput.Password = Password;
RefInput.Search = Search;
