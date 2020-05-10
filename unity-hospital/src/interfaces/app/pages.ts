import { RouteComponentProps } from "@reach/router";

export interface Page extends RouteComponentProps {}

export interface PageContainer extends Page {
  children: any;
}
