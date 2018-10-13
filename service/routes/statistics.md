# Accessible stats

`objectType` - `objectId` pairs can be:

* `Agent` - `{agent_username}`
* `GroupAgents` - AgentGroupTeam`{team_number}`
* `RoutePoint` : `+14699123081@us-east-1`

| Agent  | GroupAgents | RoutePoint |
|-|-|-|
| AverageHandlingTime | AverageHandlingTime | AverageDistributionTime |
| ConsultCalls | AverageWaitingTimeAG | AverageWaitingTime |
| CurrentAgentState | ConsultCalls | CallsEntered |
| HoldDuration | CurrMaxCallWaitingTimeAG | CurrMaxCallWaitingTime |
| InboundCalls | CurrentGroupState | CurrentInQueue |
| InteractionTransferred | CurrentInQueueAG | CurrentNumberWaitingCalls |
| InternalCalls | CurrentLoggedInAgents | ServiceLevel |
| LoginDuration | CurrentNotReadyAgents | TotalAbandoned |
| MissedCalls | CurrentNumberInCall | TotalAnswered |
| NotReadyDuration | CurrentReadyAgents | TotalDistributed |
| OutboundCalls | InboundCalls |  |
| Productivity | InteractionTransfered |  |
| ReadyDuration | InternalCalls |  |
| RefusedCalls | LongestIdleTime |  |
| TalkDuration | MissedCalls |  |
| TimeInCurrentState | OutboundCalls |  |
| WrapDuration | Productivity |  |
|  | TotalAbandonedAG |  |
|  | TotalAnsweredAG |  |
