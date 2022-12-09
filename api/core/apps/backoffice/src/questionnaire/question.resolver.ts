import { Resolver } from '@nestjs/graphql';
import { NodeResolver } from '@app/app/node.resolver';
import { QuestionnaireService } from '@app/questionnaire';

@Resolver('Question')
export class QuestionResolver extends NodeResolver {
  constructor(private readonly questionnaireService: QuestionnaireService) {
    super();
  }
}
