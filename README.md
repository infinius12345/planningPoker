https://en.wikipedia.org/wiki/Planning_poker

From WIKI-Planning poker, also called Scrum poker, is a consensus-based
, gamified technique for estimating, mostly used to estimate effort
or relative size of development goals in software development.

Essentially this module lets you type stories from your backlog and
lets all your team memebers vote on the effort required to work on
these stories. Something like https://www.youtube.com/watch?v=LERjCWWlgGc

Stacks Used in this project:
Express
PeerJS-WebRTC
Socket-io
React.

The server runs a peerserver that emits a connection event to all peers,
which is then picked up by PeerJS client running from the chat proxy
component in the frontEnd and votes/users/ are passed around and appended
to the state.