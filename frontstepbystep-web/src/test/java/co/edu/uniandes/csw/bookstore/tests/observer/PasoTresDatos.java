/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package co.edu.uniandes.csw.bookstore.tests.observer;

import co.edu.uniandes.csw.bookstore.entities.AuthorEntity;
import co.edu.uniandes.csw.bookstore.entities.BookEntity;
import co.edu.uniandes.csw.bookstore.entities.EditorialEntity;
import co.edu.uniandes.csw.bookstore.entities.ReviewEntity;
import java.util.ArrayList;
import java.util.List;
import javax.enterprise.context.ApplicationScoped;
import javax.enterprise.context.Initialized;
import javax.enterprise.event.Observes;
import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.transaction.Transactional;
import uk.co.jemos.podam.api.PodamFactory;
import uk.co.jemos.podam.api.PodamFactoryImpl;

/**
 *
 * @author a.quintero10
 */
@ApplicationScoped
public class PasoTresDatos
{
    @PersistenceContext(unitName = "BookStorePU")
    private EntityManager em;

    PodamFactory factory = new PodamFactoryImpl();
    List<ReviewEntity> reviews = new ArrayList<>();
    
    @Transactional
    void createTest(
            @Observes @Initialized(ApplicationScoped.class) final Object event)
    {
        
        BookEntity book = factory.manufacturePojo(BookEntity.class);
        book.setId(0+1L);
        for (int i =0;i<3;i++){
        ReviewEntity rw = factory.manufacturePojo(ReviewEntity.class);
        rw.setBook(book);
        em.persist(rw);
        }
       
    }
}