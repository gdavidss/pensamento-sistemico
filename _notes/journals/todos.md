---
---

- TODO **Graph**
	- TODO Adjust graph width
	- TODO Prune node after 2 edges based on selected node
	  collapsed:: true
		- Na linha 92 em notes_graph.html, existe uma função que pega todos os nodes imediatos. É diferente de prune though pq só pega nodes imediatamente conectados, mas uma solução trivial é repetir o algoritmo recursivamente pra cada um dos nodes
- **Polishing**
	- TODO **Font**
	  collapsed:: true
		- TODO Font research
- **Done**
	- DONE Identify and fix bug of home markdown file pointing to unconnected nodes
	  collapsed:: true
		- bug description: the algorithm is marking as an active node any string that simply matches, from left to right, the permalink of the selected node. Solution involves getting rid of the includes() method in isCurrentPath
	- DONE Fix bug of home always showing up as selected
	- DONE Center graph around selected node
	- DONE Change color of selected node gita
	- DONE Get selected node