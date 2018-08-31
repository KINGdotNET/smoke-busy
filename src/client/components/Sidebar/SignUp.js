import React from 'react';
import { FormattedMessage } from 'react-intl';
import './SidebarBlock.less';
import ModalSignUp from '../Modal/ModalSignUp';

const SignUp = () => (
  <div className="SidebarBlock">
    <h3 className="SidebarBlock__title">
      <FormattedMessage id="new_to_smoke" defaultMessage="New to Smoke.io?" />
    </h3>
    <div className="Steps Step1">
      <i className="iconfont icon-success_fill SidebarBlock__steps" />
      <FormattedMessage id="steps_1" defaultMessage="Create an account" />
    </div>
    <div className="Steps Step2">
      <i className="iconfont icon-success_fill SidebarBlock__steps" />
      <FormattedMessage id="steps_2" defaultMessage="Wait for confirmation" />
    </div>
    <div className="Steps Step3">
      <i className="iconfont icon-success_fill SidebarBlock__steps" />
      <FormattedMessage id="steps_3" defaultMessage="Save your keys" />
    </div>
    <div className="Steps Step4">
      <i className="iconfont icon-success_fill SidebarBlock__steps" />
      <FormattedMessage id="steps_4" defaultMessage="Log in" />
    </div>

    <ModalSignUp />
  </div>
);

export default SignUp;
