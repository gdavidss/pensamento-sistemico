---
---

- ---
  ---
- TODO Codar feature que permite que um bloco especifico seja copiado ao clicar no bullet-point
- **Meta**
- **Content**
	- TODO Create page here that contain links for aesthetic resources
		- TODO and include [this video](https://www.youtube.com/watch?v=dQJ5aEsP6Fs)
- **Polishing**
	- WAITING **Font**
	  collapsed:: true
		- TODO Font research
	- DONE Define new name for the project
- **Archive**
  collapsed:: true
	- CANCELLED Adjust zoom based on number of adjacent nodes and other criteria for better visibility
	- CANCELLED prune node after 2 edges based on selected node
	  collapsed:: true
		- Na linha 92 em notes_graph.html, existe uma função que pega todos os nodes imediatos. É diferente de prune though pq só pega nodes imediatamente conectados, mas uma solução trivial é repetir o algoritmo recursivamente pra cada um dos nodes
	- DONE Improve color backlink
	- DONE **Backlinks**
	  collapsed:: true
		- DONE Fix bug backlinks doing simple string matching with permalink or note name
	- DONE **Graph**
	  collapsed:: true
		- CANCELLED Change z-index of name of a certain node so that it's in front of the edges
		- DONE Center selected node
		- DONE Adjust graph height so it never needs to scroll on home page
		  collapsed:: true
			- I deleted this piece of code `<footer>{% include footer.html %}</footer>` in `default.html`. I might need to readd it if I decide to put the backlinks tab on the footer
		- DONE Identify and fix bug of home markdown file pointing to unconnected nodes
		  collapsed:: true
			- bug description: the algorithm is marking as an active node any string that simply matches, from left to right, the permalink of the selected node. Solution involves getting rid of the includes() method in isCurrentPath
		- DONE Fix bug of home always showing up as selected
		- DONE Center graph around selected node
		- DONE Change color of selected node
		- DONE Get selected node