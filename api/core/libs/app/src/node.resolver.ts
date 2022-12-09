import { ID, Info, ResolveField, Root } from '@nestjs/graphql';
import { GraphQLResolveInfo } from 'graphql';
import { toGlobalId } from './node';
import { NodeType } from '../../../apps/backoffice/src/graphql.schema';

export class NodeResolver {
  @ResolveField('id', () => ID, { name: 'id' })
  toId(@Root() node: NodeType, @Info() info: GraphQLResolveInfo) {
    return toGlobalId(node.id, info.parentType.name);
  }
}
